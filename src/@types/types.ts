import { IconType } from "react-icons";

type NextImageType = {
  imageUrl: string;
  imageDarkUrl?: string;
  altImage: string;
  extraClassName?: string;
  className?: string;
  sizes: string;
  fill?: boolean;
  draggable?: boolean;
  width?: number;
  height: number;
};

type IconProps = {
  Icon: IconType;
  url: string;
  size?: string;
  color?: string;
  alt: string;
};

type AdvertisingSectionProps = {
  href?: string;
  topTitle?: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  buttonText?: string;
  quality?: number;
};

type Category = {
  id: string;
  name: string;
  color: string;
};

type Categories = {
  [key: string]: Category;
};

export type { NextImageType, IconProps, AdvertisingSectionProps, Category, Categories };
