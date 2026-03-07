import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-[#0D0D0D] py-12 text-white/60">
      <div className="page-wrapper">
      <div className="page-inner text-sm">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand & Mission section */}
          <div className="md:max-w-[400px]">
            <h3 className="font-bebas text-3xl text-white tracking-widest mb-4">Texas Frenchie Network</h3>
            <p className="leading-relaxed opacity-80 mb-6 font-mono text-xs uppercase tracking-wider text-[#E8500A]">
              The Ultimate Directory for Texas French Bulldog Owners.
            </p>
          </div>
          
          {/* Quick links block */}
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-white/90">Cities</h4>
              <Link href="/austin" className="hover:text-white transition-colors">Austin</Link>
              <Link href="/dallas" className="hover:text-white transition-colors">Dallas</Link>
              <Link href="/houston" className="hover:text-white transition-colors">Houston</Link>
              <Link href="/san-antonio" className="hover:text-white transition-colors">San Antonio</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-white/90">Resources</h4>
              <Link href="/guide" className="hover:text-white transition-colors">Summer Survival Guide</Link>
              <Link href="/claim" className="hover:text-white transition-colors">Claim Your Business</Link>
              <a href="https://petshealthessentials.com" className="text-[#E8500A] hover:text-[#ff5d14] transition-colors">petshealthessentials.com</a>
            </div>
          </div>
        </div>

        {/* TDPSA Privacy Notice */}
        <div id="privacy" className="border-t border-white/10 pt-8 text-xs leading-relaxed opacity-70">
          <strong className="block text-white mb-2 uppercase tracking-wide font-mono">Privacy & Tracking Notice</strong>
          <p className="mb-4">
            We value your privacy. This site uses the Meta Pixel and similar tracking technologies 
            to collect data for Targeted Advertising so we can connect with Texas Frenchie lovers. 
            We only collect reasonably necessary information (like your email when you subscribe) 
            and do not &quot;sell&quot; your personal data to third parties.
          </p>
          <p className="mb-4">
            Under the Texas Data Privacy and Security Act (TDPSA), you have the right to request 
            access, correction, or deletion of your data, and to opt-out of targeted advertising at any time.
          </p>
          <div className="flex flex-wrap gap-4 mt-4">
            {/* These are placeholder buttons until we install a full Consent Management Platform */}
            <button className="underline decoration-white/30 hover:decoration-white transition-colors">
              Manage Tracking Preferences
            </button>
            <span className="hidden md:inline">•</span>
            <button className="underline decoration-white/30 hover:decoration-white transition-colors">
              Request Data Deletion
            </button>
          </div>
          
          <p className="mt-8 opacity-50 text-[10px] uppercase font-mono tracking-widest border-t border-white/5 pt-4">
            © {new Date().getFullYear()} The Texas Frenchie Network. Built collaboratively.
          </p>
        </div>
      </div>
      </div>
    </footer>
  );
}
