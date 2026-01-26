"use client";

export function Footer() {
    return (
        <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
            <div className="max-w-6xl mx-auto px-6 text-center text-slate-500 dark:text-slate-500">
                © {new Date().getFullYear()} Open Agent Skills. All rights reserved.
            </div>
        </footer>
    );
}
