export default function Footer({
  extraLink,
}: {
  extraLink?: { href: string; label: string };
}) {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-bottom">
          <span>© 2026 Mrs. Dani. All rights reserved.</span>
          {extraLink && <a href={extraLink.href}>{extraLink.label}</a>}
        </div>
      </div>
    </footer>
  );
}
