import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, Check } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Language {
    code: string;
    name: string;
    flag: string;
}

const LanguageSelector: React.FC = () => {
    const { i18n } = useTranslation();

    const languages: Language[] = [
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'zh', name: '中文', flag: '🇨🇳' },
    ];

    // Extract primary language code (e.g., "en" from "en-US")
    const currentLangCode = i18n.language?.split('-')[0] || 'en';
    const current = languages.find(lang => lang.code === currentLangCode) || languages[0];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-[#0d121b] dark:text-gray-300 dark:hover:text-white text-sm font-medium leading-normal cursor-pointer transition-colors">
                    <Globe className="w-4 h-4" />
                    <span className="hidden sm:inline">{current.flag} {current.name}</span>
                    <span className="sm:hidden">{current.flag}</span>
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => i18n.changeLanguage(lang.code)}
                        className="cursor-pointer"
                    >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                        {currentLangCode === lang.code && (
                            <Check className="ml-auto w-4 h-4" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default LanguageSelector;
