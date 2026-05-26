import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-[#050c1c] border-t border-[var(--line)] py-8 text-white">
            <div className="container mx-auto px-4 sm:px-6 text-center">
                <p className="text-lg font-semibold">Rudra</p>
                <p className="text-sm text-[#a4bbeb] mt-2">AI Systems Engineer & Full-Stack Developer</p>
                <div className="flex justify-center gap-6 mt-6">
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#a4bbeb] hover:text-[var(--neon-cyan)] transition-colors">
                        <FaGithub />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#a4bbeb] hover:text-[var(--neon-cyan)] transition-colors">
                        <FaLinkedin />
                    </a>
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-2xl text-[#a4bbeb] hover:text-[var(--neon-cyan)] transition-colors">
                        <FaTwitter />
                    </a>
                </div>
                <div className="mt-8 border-t border-[var(--line)] pt-6">
                    <p className="text-xs text-[#7f96c7]">
                        &copy; {new Date().getFullYear()} Rudra. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
