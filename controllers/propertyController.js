const Property = require("../models/Property");

// Create Property
exports.createProperty = async (req, res) => {
  const { title, description, price, location, type, status } = req.body;
  console.log(req.body)

  try {
    const property = new Property({
      agent: req.agent.id,
      title,
      description,
      price,
      location,
      type,
      status,
    });

    await property.save();
    res.status(201).json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

// Get Properties with filters
exports.getProperties = async (req, res) => {
  const { location, minPrice, maxPrice, type, status } = req.query;

  // Initialize the filter object
  const filter = {};

  // Apply filters based on query parameters
  if (location) {
    filter.location = { $regex: new RegExp(location, "i") }; // Case-insensitive search
  }
  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = parseFloat(minPrice);
    if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
  }
  if (type) {
    filter.type = type;
  }
  if (status) {
    filter.status = status;
  }

  try {
    // Fetch properties from the database with applied filters
    const properties = await Property.find(filter).populate("agent", [
      "name",
      "email",
    ]);

    // Respond with the filtered properties
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


// Update Property
exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, type, status, agent } = req.body;

  try {
    let property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    // Update property fields
    property.title = title || property.title;
    property.description = description || property.description;
    property.price = price || property.price;
    property.location = location || property.location;
    property.type = type || property.type;
    property.status = status || property.status;
    property.agent = agent || property.agent;

    await property.save();

    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};


// Delete Property
exports.deleteProperty = async (req, res) => {
    try {
        const { id } = req.params;
        await Property.findByIdAndDelete(id);
        res.status(200).json({ message: 'Property deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting property' });
    }
};
