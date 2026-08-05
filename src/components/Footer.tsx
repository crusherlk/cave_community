export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t bg-white py-8">
      <div className="cc_container flex flex-col items-center justify-between gap-4 text-center text-sm sm:flex-row sm:text-left">
        <p>&copy; 2026 Crusherlk. All rights reserved.</p>
        <img className="w-16 grayscale" src="/cave-logo.png" alt="cave-logo" />
      </div>
    </footer>
  );
}
