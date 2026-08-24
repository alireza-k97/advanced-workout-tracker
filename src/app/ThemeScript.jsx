import Script from "next/script";

export default function ThemeScript() {
  return (
    <Script
      id="theme-script"
      strategy="beforeInteractive"
    >
      {`
        (() => {
          const theme = localStorage.getItem("theme");

          if (theme === "dark") {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
        })();
      `}
    </Script>
  );
}