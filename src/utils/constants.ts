import type { Project } from '@/components/ui/Header';
import { PanelsIcon } from '@/components/ui/Icon';
import type { ApiRequest, Link, Tab } from './types';

export const API: Record<string, ApiRequest> = {
  getTreeRows: {
    method: 'GET',
    endpoint: `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_EID}/row/list`,
  },
  createRowInEntity: {
    method: 'POST',
    endpoint: `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_EID}/row/create`,
  },
  updateRow: {
    method: 'POST', // I wonder why it's not PUT
    endpoint: (rowId: string) =>
      `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_EID}/row/${rowId}/update`,
  },
  deleteRow: {
    method: 'DELETE',
    endpoint: (rowId: string) =>
      `/v1/outlay-rows/entity/${process.env.NEXT_PUBLIC_EID}/row/${rowId}/delete`,
  },
};

// Same as in src/styles/_colors.scss
// :export doesn't work with turbopack yet
// Not enum due to optimization reasons (see how enum is transpiled)
export const COLORS = {
  text: '#ffffff',
  dimmed: '#a1a1aa',
  background: '#202124',
  layout: '#27272a',
  primary: '#7890b2',
  secondary: '#df4444',
};

/** Mock data: */

export const HEADER_PROJECT: Project = {
  name: 'Название проекта',
  description: 'Аббревиатура',
};

export const HEADER_LINKS: Link[] = [
  {
    href: '/',
    label: 'Просмотр',
  },
  {
    href: '/manage',
    label: 'Управление',
  },
];

export const TABS: Tab[] = [
  {
    name: 'По проекту',
    label: 'По проекту',
    icon: PanelsIcon,
    id: 'project',
  },
  {
    name: 'Объекты',
    label: 'Объекты',
    icon: PanelsIcon,
    id: 'objects',
  },
  {
    name: 'РД',
    label: 'РД',
    icon: PanelsIcon,
    id: 'rd',
  },
  {
    name: 'МТО',
    label: 'МТО',
    icon: PanelsIcon,
    id: 'mto',
  },
  {
    name: 'Строительно-монтажные работы',
    label: 'СМР',
    icon: PanelsIcon,
    id: 'smr',
  },
  {
    name: 'График',
    label: 'График',
    icon: PanelsIcon,
    id: 'schedule',
  },
  {
    name: 'МиМ',
    label: 'МиМ',
    icon: PanelsIcon,
    id: 'mim',
  },
  {
    name: 'Рабочие',
    label: 'Рабочие',
    icon: PanelsIcon,
    id: 'workers',
  },
  {
    name: 'Капитальные вложения',
    label: 'Капвложения',
    icon: PanelsIcon,
    id: 'capex',
  },
  {
    name: 'Бюджет',
    label: 'Бюджет',
    icon: PanelsIcon,
    id: 'budget',
  },
  {
    name: 'Финансирование',
    label: 'Финансирование',
    icon: PanelsIcon,
    id: 'finance',
  },
  {
    name: 'Панорамы',
    label: 'Панорамы',
    icon: PanelsIcon,
    id: 'panoramas',
  },
  {
    name: 'Камеры',
    label: 'Камеры',
    icon: PanelsIcon,
    id: 'cameras',
  },
  {
    name: 'Поручения',
    label: 'Поручения',
    icon: PanelsIcon,
    id: 'tasks',
  },
  {
    name: 'Контрагенты',
    label: 'Контрагенты',
    icon: PanelsIcon,
    id: 'contractors',
  },
];

export const OPENED_TABS: string[] = ['smr'];
