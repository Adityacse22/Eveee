const API_BASE_URL = "http://localhost:5000"; // Change to your backend's URL

export async function bookChargingSession(data: {
  date: string;
  time: string;
  duration: number;
}) {
  const response = await fetch(`${API_BASE_URL}/api/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Booking failed");
  }
  return response.json();
}