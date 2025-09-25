import React from 'react';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Check, ChevronsUpDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation, SUPPORTED_LANGUAGES, type LanguageInfo } from '@/lib/i18n';

interface LanguageSelectorProps {
  className?: string;
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showLabel?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  className,
  variant = 'outline',
  size = 'default',
  showLabel = true
}) => {
  const { language, setLanguage, supportedLanguages } = useTranslation();
  const [open, setOpen] = React.useState(false);

  const currentLanguage = supportedLanguages.find(lang => lang.code === language);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={variant}
          size={size}
          role="combobox"
          aria-expanded={open}
          className={cn('justify-between', className)}
        >
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            {showLabel && (
              <span className="hidden sm:inline">
                {currentLanguage?.nativeName || 'English'}
              </span>
            )}
            <span className="text-lg">{currentLanguage?.flag || '🇺🇸'}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search languages..." />
          <CommandList>
            <CommandEmpty>No language found.</CommandEmpty>
            <CommandGroup>
              {supportedLanguages.map((lang) => (
                <CommandItem
                  key={lang.code}
                  value={`${lang.name} ${lang.nativeName} ${lang.code}`}
                  onSelect={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={cn(
                    'flex items-center justify-between cursor-pointer',
                    lang.rtl && 'text-right'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="font-medium">{lang.nativeName}</span>
                      <span className="text-sm text-muted-foreground">{lang.name}</span>
                    </div>
                  </div>
                  <Check
                    className={cn(
                      'ml-auto h-4 w-4',
                      language === lang.code ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Compact version for mobile or small spaces
export const CompactLanguageSelector: React.FC<Omit<LanguageSelectorProps, 'showLabel'>> = (props) => {
  return <LanguageSelector {...props} showLabel={false} />;
};

// Language toggle component for quick switching between two languages
interface LanguageToggleProps {
  primaryLanguage: LanguageInfo;
  secondaryLanguage: LanguageInfo;
  className?: string;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  primaryLanguage,
  secondaryLanguage,
  className
}) => {
  const { language, setLanguage } = useTranslation();
  const isPrimary = language === primaryLanguage.code;

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(isPrimary ? secondaryLanguage.code : primaryLanguage.code)}
      className={cn('gap-2', className)}
    >
      <span className="text-lg">{isPrimary ? primaryLanguage.flag : secondaryLanguage.flag}</span>
      <span className="hidden sm:inline">
        {isPrimary ? primaryLanguage.code.toUpperCase() : secondaryLanguage.code.toUpperCase()}
      </span>
    </Button>
  );
};
