export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s]+$/; // Basic regex (improve if needed)
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";
  const words = name.split(" "); // Space pe split karo
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    if (words[i]) {
      initials += words[i][0];
    }
  }
  return initials.toUpperCase();
};