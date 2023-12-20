import { TbMountain } from 'react-icons/tb';
import { 
  GiJourney,
  GiCastle, 
  GiWaterfall, 
  GiForestCamp, 
  GiIsland,
  GiWindmill,
  GiKneeling,
  GiRiver,
  GiMountainCave 
} from 'react-icons/gi';
import { FaGuitar } from "react-icons/fa";
import { GiGuitarBassHead } from "react-icons/gi";

import { IoRestaurantSharp } from "react-icons/io5";
import { MdOutlineVilla } from 'react-icons/md';
import { HiUserGroup } from "react-icons/hi2";
import { FaPerson } from "react-icons/fa6";

export const categories = [
    {
      label: 'Mariachi',
      icon: FaGuitar,
      description: 'Mariachi',
    },
    {
      label: 'Vallenato',
      icon: GiWindmill,
      description: 'Vallenato',
    },
    {
      label: 'Papayera',
      icon: GiGuitarBassHead,
      description: 'Papayera'
    },
    {
      label: 'Solistas',
      icon: FaPerson,
      description: 'Solistas'
    },
    {
      label: 'Acompañamiento',
      icon: HiUserGroup,
      description: 'Acompañamiento'
    },
    {
      label: 'Cuevas',
      icon: GiMountainCave,
      description: 'Cuevas'
    },
    {
      label: 'Senderos',
      icon: GiJourney,
      description: 'Senderos'
    },
    {
      label: 'Santuarios',
      icon: GiKneeling,
      description: 'Santuarios'
    },
    {
      label: 'Museos',
      icon: GiCastle,
      description: 'Museos'
    },
    {
      label: 'Camping',
      icon: GiForestCamp,
      description: 'Camping'
    },
    {
      label: 'Hotel',
      icon: MdOutlineVilla,
      description: 'Hotel'
    },
    {
      label: 'Restaurante',
      icon: IoRestaurantSharp,
      description: 'Restaurante'
    },
  ]