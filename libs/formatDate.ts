 export function formatDate(createdAt:Date) {
    let formattedDate;
    const now = new Date().getTime();
    const timeDifference = now - new Date(createdAt).getTime();

    if (timeDifference < 60000) {
      formattedDate = "Just now";
    } else if (timeDifference < 3600000) {
      const minutes = Math.floor(timeDifference / 60000);
      formattedDate = `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    } else if (timeDifference < 86400000) {
      const hours = Math.floor(timeDifference / 3600000);
      formattedDate = `${hours} hour${hours > 1 ? "s" : ""} ago`;
    } else {
      formattedDate = createdAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
    return formattedDate
  }
