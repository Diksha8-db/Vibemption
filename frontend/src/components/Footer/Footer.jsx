const Footer = () => {
    return (
      <footer className="bg-black border-t-1 border-(--color-primary) text-white py-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 ">
          
          {/* Brand */}
          <div>
            <h2 className="text-3xl font-bold text-(--color-primary)">Vibemption</h2>
            <p className="mt-3 text-sm text-(--color-secondary)">
              Let your vibe choose the music. Discover, reflect, and feel.
            </p>
          </div>
  
          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-purple-300">Home</a></li>
              <li><a href="/dashboard" className="hover:text-purple-300">Dashboard</a></li>
              <li><a href="/explore" className="hover:text-purple-300">Playlists</a></li>
              <li><a href="/favorites" className="hover:text-purple-300">Favorites</a></li>
            </ul>
          </div>
  
          {/* Contact / Social */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: bhartidiksha2008@gmail.com</li>
              <li>
                <div className="flex gap-3 mt-1">
                  <a href="https://www.linkedin.com/in/diksha-bharti-055499326/" className="hover:text-purple-400">Linkedin</a>
                  <a href="https://github.com/Diksha8-db" className="hover:text-purple-400">GitHub</a>
                </div>
                </li>
            </ul>
          </div>
        </div>
  
        {/* Bottom Bar */}
        <div className="mt-10 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Vibemption. All rights reserved.
        </div>
      </footer>
    );
  };
  
  export default Footer;