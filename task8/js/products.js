const products = [
  {
    id: "kairo-arc",
    name: "Kairo Arc",
    category: "Input",
    price: 6999,
    image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800",
    description: "A meticulously engineered mechanical keyboard with tactile switches, hot-swappable PCB, and a solid aluminum chassis. Designed for typists and developers who demand precision.",
    shortDescription: "Premium mechanical keyboard with tactile switches.",
    tags: ["keyboard", "mechanical", "desk", "input", "typing"],
    specifications: {
      "Connection": "USB-C & Bluetooth 5.0",
      "Material": "Aerospace-grade Aluminium",
      "Compatibility": "Windows / macOS",
      "Warranty": "2 Years"
    }
  },
  {
    id: "kairo-pulse",
    name: "Kairo Pulse",
    category: "Input",
    price: 3499,
    image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?auto=format&fit=crop&q=80&w=800",
    description: "An ergonomic wireless mouse designed for all-day comfort. Features a precision optical sensor, programmable side buttons, and a sculpted profile that fits naturally in your hand.",
    shortDescription: "Ergonomic wireless mouse with precision tracking.",
    tags: ["mouse", "wireless", "desk", "input", "ergonomic"],
    specifications: {
      "Sensor": "16,000 DPI Optical",
      "Battery Life": "Up to 70 hours",
      "Connectivity": "2.4GHz Wireless & Bluetooth",
      "Weight": "95g"
    }
  },
  {
    id: "kairo-frame",
    name: "Kairo Frame",
    category: "Accessories",
    price: 2499,
    image: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800",
    description: "Elevate your laptop to eye level for better posture and cooling. The Kairo Frame is crafted from a single piece of aluminum, providing a stable and minimal platform for any laptop up to 16 inches.",
    shortDescription: "Minimalist aluminum laptop stand.",
    tags: ["stand", "laptop", "desk", "ergonomics", "aluminum"],
    specifications: {
      "Material": "Anodized Aluminium",
      "Supported Sizes": "11-inch to 16-inch laptops",
      "Dimensions": "250mm x 210mm x 75mm",
      "Warranty": "Lifetime"
    }
  },
  {
    id: "kairo-loop",
    name: "Kairo Loop",
    category: "Accessories",
    price: 1799,
    image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&q=80&w=800",
    description: "Expand your connectivity with the Loop USB-C Hub. Featuring a sleek, compact design that adds essential ports back to your modern laptop without the bulk.",
    shortDescription: "Compact 7-in-1 USB-C connectivity hub.",
    tags: ["hub", "usb-c", "adapter", "dongle", "connectivity"],
    specifications: {
      "Ports": "2x USB-A, 1x USB-C, 1x HDMI, SD/MicroSD",
      "Passthrough": "Up to 100W PD",
      "Material": "Aluminium shell",
      "Compatibility": "Universal USB-C"
    }
  },
  {
    id: "kairo-core",
    name: "Kairo Core",
    category: "Desk",
    price: 1299,
    image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&q=80&w=800",
    description: "Define your workspace with the Core Desk Mat. Made from premium vegan leather, it provides a smooth, protective surface for your keyboard and mouse while adding a touch of warmth to your desk.",
    shortDescription: "Premium vegan leather desk mat.",
    tags: ["mat", "pad", "desk", "leather", "workspace"],
    specifications: {
      "Material": "Vegan Leather & Suede backing",
      "Dimensions": "900mm x 400mm",
      "Thickness": "3mm",
      "Care": "Water-resistant, wipe clean"
    }
  },
  {
    id: "kairo-wave",
    name: "Kairo Wave",
    category: "Audio",
    price: 4999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
    description: "Immersive over-ear headphones with active noise cancellation. The Kairo Wave blocks out distractions so you can focus on your work or enjoy your favorite music with exceptional clarity.",
    shortDescription: "Over-ear headphones with active noise cancellation.",
    tags: ["audio", "headphones", "anc", "music", "listening"],
    specifications: {
      "Drivers": "40mm Custom Dynamic",
      "Battery Life": "30 hours with ANC",
      "Connectivity": "Bluetooth 5.2 & 3.5mm",
      "Weight": "260g"
    }
  },
  {
    id: "kairo-dock",
    name: "Kairo Dock",
    category: "Power",
    price: 3499,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800",
    description: "Keep all your devices charged and organized. The Dock provides wireless charging for your phone and earbuds, plus additional USB ports for other accessories, all in a beautiful sculptural form.",
    shortDescription: "Multi-device wireless charging station.",
    tags: ["charger", "power", "wireless", "dock", "desk"],
    specifications: {
      "Output": "15W Wireless, 20W USB-C PD",
      "Material": "Matte Polycarbonate & Steel",
      "Compatibility": "Qi-compatible devices",
      "Power Adapter": "Included (45W)"
    }
  },
  {
    id: "kairo-axis",
    name: "Kairo Axis",
    category: "Gaming",
    price: 4999,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
    description: "A precision controller designed for PC gaming. Features Hall effect sensors for drift-free thumbsticks, tactile mechanical buttons, and a comfortable textured grip.",
    shortDescription: "Precision PC gaming controller with Hall effect sensors.",
    tags: ["gaming", "controller", "pc", "play", "joystick"],
    specifications: {
      "Sensors": "Hall Effect Analog Sticks",
      "Connectivity": "2.4GHz Wireless & USB-C",
      "Battery Life": "40 hours",
      "Compatibility": "Windows / Steam"
    }
  },
  {
    id: "kairo-beam",
    name: "Kairo Beam",
    category: "Desk",
    price: 2499,
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800",
    description: "Illuminate your workspace perfectly. The Beam desk lamp offers adjustable color temperature and brightness, casting a glare-free light that reduces eye strain during late-night sessions.",
    shortDescription: "Adjustable LED desk lamp for focused work.",
    tags: ["light", "lamp", "desk", "illumination", "reading"],
    specifications: {
      "Brightness": "Up to 800 Lumens",
      "Color Temp": "2700K to 6500K Adjustable",
      "Material": "Aluminium alloy",
      "Power": "USB-C input"
    }
  },
  {
    id: "kairo-carry",
    name: "Kairo Carry",
    category: "Accessories",
    price: 1799,
    image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?auto=format&fit=crop&q=80&w=800",
    description: "Organize your cables, chargers, and small accessories when on the move. The Carry pouch features intelligent internal organization and weather-resistant exterior materials.",
    shortDescription: "Weather-resistant tech organization pouch.",
    tags: ["bag", "pouch", "carry", "travel", "organization"],
    specifications: {
      "Material": "Water-repellent Nylon",
      "Zippers": "YKK AquaGuard",
      "Dimensions": "200mm x 120mm x 60mm",
      "Capacity": "1.5L"
    }
  }
];
