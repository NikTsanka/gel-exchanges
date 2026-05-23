export function Footer() {
  return (
    <footer className="border-t mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          მონაცემები:{" "}
          <a
            href="https://nbg.gov.ge"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground underline underline-offset-4"
          >
            საქართველოს ეროვნული ბანკი
          </a>
        </p>
        <p>
          Built by{" "}
          <a
            href="https://canka.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono font-semibold text-foreground hover:opacity-80 transition-opacity"
          >
            canka.dev
            <span className="blink-cursor">_</span>
          </a>
        </p>
      </div>
    </footer>
  );
}
