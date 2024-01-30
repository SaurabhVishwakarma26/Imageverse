import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
  title: "Imageverse",
  description: "Discover and share images.",
};

const layout = ({ children }) => {
  return (
    <html lang="en" style={{ backgroundColor: "#212121" }}>
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  );
};

export default layout;
