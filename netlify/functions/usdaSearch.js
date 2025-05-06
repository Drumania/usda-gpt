const fetch = require("node-fetch");

exports.handler = async (event) => {
  const { query } = JSON.parse(event.body || "{}");

  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  const apiKey = "TU_AP_KEY";
  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(
    query
  )}&api_key=${apiKey}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data.foods?.slice(0, 5)), // Podés limitar la respuesta
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "USDA API error", details: error.message }),
    };
  }
};
