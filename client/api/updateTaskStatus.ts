export const updateTaskStatus = async (token: string | null, id: string) => {
  const response = await fetch(
    `https://${process.env.NEXT_PUBLIC_NEXT_APP_URL}/api/tasks/${id}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!response.ok) throw new Error("Network response was not ok");
};
