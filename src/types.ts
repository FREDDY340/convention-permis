export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface StatItem {
  value: string;
  label: string;
  icon: 'layers' | 'users' | 'award' | 'sparkles';
}

export interface ProjectPreview {
  id: string;
  title: string;
  category: string;
  year: string;
  image: string;
}
