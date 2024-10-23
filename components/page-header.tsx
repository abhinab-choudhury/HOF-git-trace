"use client";

import { usePathname, useRouter } from "next/navigation"; // Import `usePathname` for App Router
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton, SignupButton } from "./auth";
import { Badge } from "./ui/badge";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { FaXTwitter } from "react-icons/fa6";
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MenuIcon } from "lucide-react";
import UserAccountDropDown from "./UserAccDropDown";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const PageHeader = () => {
  const { theme } = useTheme();
  const { data: session } = useSession();
  const pathname = usePathname(); // Get current path directly
  const [activePath, setActivePath] = useState(pathname); // Initialize with current path

  useEffect(() => {
    setActivePath(pathname); // Update when pathname changes
  }, [pathname]);

  const handleGitHubClick = () => {
    window.location.href = "https://github.com/rahulsainlll/git-trace";
  };

  const handleTweetClick = () => {
    const tweetText = encodeURIComponent(
      `Check out "git-trace dot com" made for GSOC folks\n\n～one place multiple Issues～\nSearch the repository -> save individual repo & issues\n\nGSOC'25 folks select and save your issues\n\napp/users/ https://git-trace.vercel.app\napp/contributor/ https://github.com/rahulsainlll/git-trace`
    );
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  const isActive = (href:string) =>
    activePath === href ? "text-black font-bold" : "text-muted-foreground dark:text-gray-200";

  return (
    <header className="sticky inset-x-0 top-0 z-30 w-full transition-all bg-white/20 dark:bg-black backdrop-blur-md">
      <div className="w-full max-w-screen-xl px-2.5 py-3 lg:px-20 relative mx-auto border-b sm:block hidden">
        <div className="flex h-14 items-center justify-between text-md">
          <Link href="/">
            <div className="flex items-center">
              <Image src={theme === 'dark' ? '/git4.png' : '/git3.png'} alt="Logo" width={38} height={38} />
              <div className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-black'}`}>- trace</div>
            </div>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/dashboard">
              <div
                className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                  "/dashboard"
                )}`}
              >
                Dashboard
              </div>
            </Link>
            <Link href="/popular">
              <div className="ml-2 text-sm md:text-base font-light text-muted-foreground  hover:underline ">
                Popular
              </div>
            </Link>
            <Link href="/blog">
              <div
                className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                  "/blog"
                )}`}
              >
                Blogs
              </div>
            </Link>
            <Link href="/about">
              <div
                className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                  "/about"
                )}`}
              >
                About
              </div>
            </Link>
            <Link href="/contributor">
              <div className="ml-2 text-sm md:text-base font-light text-muted-foreground  hover:underline ">
                Contributors
              </div>
            </Link>
            <Link href="/faq">
              <div className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                  "/faq"
                )}`}>
               FAQ
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <ModeToggle />
            <Badge
              className="gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-neutral-900"
              variant="outline"
              onClick={handleGitHubClick}
              style={{ cursor: "pointer" }}
            >
              <GitHubLogoIcon className="dark:text-neutral-950" />
              <span className="text-black">Star</span>
            </Badge>

            <Badge
              className="gap-2 px-3 py-2 bg-neutral-950 text-white hover:bg-neutral-800"
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              <FaXTwitter className="dark:text-neutral-950"/>
              Post
            </Badge>

            {session ? (
              // <LogoutButton />
              <UserAccountDropDown />
            ) : (
              <>
                <LoginButton />
              </>
            )}
          </div>
        </div>
      </div>

      <div className="sm:hidden flex h-16 items-center justify-between border-b px-2">
        <Link href="/" className="flex items-center">
          <Image src={theme === 'dark' ? '/git4.png' : '/git3.png'} alt="Logo" width={38} height={38} />
        </Link>

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <Badge
              className="gap-1 bg-slate-50 hover:bg-slate-100"
              variant="outline"
              onClick={handleGitHubClick}
              style={{ cursor: "pointer" }}
            >
              <GitHubLogoIcon className="dark:text-neutral-950" />
              <span className="text-black">Star</span>
            </Badge>

            <Badge
              className="gap-1 rounded-xl"
              onClick={handleTweetClick}
              style={{ cursor: "pointer" }}
            >
              
              <FaXTwitter className="dark:text-neutral-950" />
              Post
            </Badge>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mr-3 mt-2">
              <DropdownMenuItem>
                <div className="flex flex-col gap-4 justify-start">
                  <Link href="/dashboard">
                    <div
                      className={`ml-2 text-sm md:text-base text-[#425893] hover:underline ${isActive(
                        "/dashboard"
                      )}`}
                    >
                      Dashboard
                    </div>
                  </Link>
                  <Link href="/popular">
                    <div className="ml-2 text-sm md:text-base font-light text-muted-foreground  hover:underline ">
                      Popular
                    </div>
                  </Link>
                  <Link href="/blog">
                    <div
                      className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                        "/blog"
                      )}`}
                    >
                      Blogs
                    </div>
                  </Link>
                  <Link href="/about">
                    <div
                      className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                        "/about"
                      )}`}
                    >
                      About
                    </div>
                  </Link>
                  <Link href="/contributor">
                    <div className="ml-2 text-sm md:text-base font-light text-muted-foreground  hover:underline ">
                      Contributors
                    </div>
                  </Link>
                  <Link href="/faq">
                    <div className={`ml-2 text-sm md:text-base dark:text-white font-light hover:underline ${isActive(
                        "/faq"
                      )}`}>
                    FAQ
                    </div>
                  </Link>

                  {session ? (
                    // <LogoutButton />
                    <>
                      <UserAccountDropDown />
                      <ModeToggle size="lg" />
                    </>

                  ) : (
                    <>
                      <LoginButton />
                      <ModeToggle size="lg" />
                    </>
                  )}
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default PageHeader;
