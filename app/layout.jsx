import "@styles/globals.css";

export const metadata = {
  title: "Imageverse",
  description: "Discover and share images.",
};

const layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default layout;
