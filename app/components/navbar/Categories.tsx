'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { FaMountain, FaSkiing } from "react-icons/fa";
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';
import { GrWheelchairActive } from "react-icons/gr";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import {
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
  GiBarn,
  GiGrapes,
  GiWoodCabin,
  GiTreehouse,
  GiGolfTee,
  GiColiseum,
} from "react-icons/gi";
import {
  MdOutlineVilla,
  MdOutlineAttractions,
  MdSurfing,
} from "react-icons/md";


import CategoryBox from "../CategoryBox";
import Container from '../Container';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export const categories = [
  {
    label: "Playa",
    icon: TbBeach,
    description: "Esta propiedad está cerca de la playa!",
  },
  {
    label: "Molinos de viento",
    icon: GiWindmill,
    description: "Esta propiedad tiene molinos de viento!",
  },
  {
    label: "Modernos",
    icon: MdOutlineVilla,
    description: "Esta propiedad es moderna!",
  },
  {
    label: "Cabaña",
    icon: GiWoodCabin,
    description: "Esta propiedad es una cabaña!",
  },
  {
    label: "Campo",
    icon: TbMountain,
    description: "Esta propiedad está cerca del campo!",
  },
  {
    label: "Casas del árbol",
    icon: GiTreehouse,
    description: "Esta propiedad es una casa del árbol!",
  },
  {
    label: "Piscina",
    icon: TbPool,
    description: "Esta propiedad tiene piscina",
  },
  {
    label: "Islas",
    icon: GiIsland,
    description: "Esta propiedad está en una isla!",
  },
  {
    label: "En el Lago",
    icon: GiBoatFishing,
    description: "Esta propiedad está cerca de un lago!",
  },
  {
    label: "Esquí",
    icon: FaSkiing,
    description: "Esta propiedad tiene actividades de esquí!",
  },
  {
    label: "Castillo",
    icon: GiCastle,
    description: "Esta propiedad está cerca de un castillo!",
  },
  {
    label: "Acampar",
    icon: GiForestCamp,
    description: "Esta propiedad tiene actividades de acampar!",
  },
  {
    label: "Ártico",
    icon: BsSnow,
    description: "Esta propiedad está cerca del Ártico!",
  },
  {
    label: "Cueva",
    icon: GiCaveEntrance,
    description: "Esta propiedad está cerca de una cueva!",
  },
  {
    label: "Desierto",
    icon: GiCactus,
    description: "Esta propiedad está cerca del desierto!",
  },
  {
    label: "Granjas",
    icon: GiBarn,
    description: "Esta propiedad está en una granja!",
  },
  {
    label: "En las Alturas",
    icon: FaMountain,
    description: "Esta propiedad está en las alturas!",
  },
  {
    label: "Surf",
    icon: MdSurfing,
    description: "Esta propiedad tiene actividades de surf!",
  },
  {
    label: "Golf",
    icon: GiGolfTee,
    description: "Esta propiedad tiene campos de golf",
  },
  {
    label: "Ciudades Emblemáticas",
    icon: GiColiseum,
    description: "Esta propiedad está en ciudades emblemáticas!",
  },
  {
    label: "Atracciones",
    icon: MdOutlineAttractions,
    description: "Esta propiedad está cerca de atracciones!",
  },
  {
    label: "Viñedos",
    icon: GiGrapes,
    description: "Esta propiedad está en un viñedo!",
  },
  {
    label: "Adaptados",
    icon: GrWheelchairActive,
    description: "Esta propiedad es adaptada para personas con discapacidad!",
  },
  {
    label: "Lujo",
    icon: IoDiamond,
    description: "Esta propiedad es de lujo!",
  },
];

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "-2%",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "fit-content",
        height: "fit-content",
        margin: "auto",
      }}
      onClick={onClick}
    >
      <IoIosArrowBack style={{ fontSize: "2rem", color: "#F43F5E" }} />
    </div>
  );
};

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        right: "-2%",
        transform: "translateY(-50%)",
        zIndex: 1,
        width: "fit-content",
        height: "fit-content",
        margin: "auto",
      }}
      onClick={onClick}
    >
      <IoIosArrowForward style={{ fontSize: "2rem", color: "#F43F5E" }} />
    </div>
  );
};

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 15,
  slidesToScroll: 3,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 10,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 8,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },
  ],
};

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isMainPage = pathname === '/';

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <Slider {...settings} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            icon={item.icon}
            selected={category === item.label}
          />
        ))}
      </Slider>
    </Container>
  );
}
 
export default Categories;