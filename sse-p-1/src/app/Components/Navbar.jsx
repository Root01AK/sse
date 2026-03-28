import CardNav from "./CardNav";
import Link from "next/link";

const items = [
  {
    label: "Home",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Home", ariaLabel: "About Us", href: "/" },
      { label: "Core values", ariaLabel: "Careers", href: "/#services" },
      { label: "Testimonials", ariaLabel: "Testimonials", href: "/#Testimonials" },
    ],
  },
  {
    label: "About Us",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "About SSE", ariaLabel: "About Sai Saranya Enterprises", href: "/About" },
      { label: "Our Commitment", ariaLabel: "Commitment", href: "/About#commitment" },
      { label: "FAQ", ariaLabel: "Frequently Asked Questions ", href: "/About#faq" },
    ],
  },
  {
    label: "Products",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      {
        label: "Blocks",
        ariaLabel: "Blocks Section",
        href: "/Products#paver-block",
      },
      {
        label: "Bricks",
        ariaLabel: "Bricks Section",
        href: "/Products#bricks-blocks",
      },
      {
        label: "Sand",
        ariaLabel: "Sand Section",
        href: "/Products#sand-aggregates",
      },
      {
        label: "Stone",
        ariaLabel: "Sand Section",
        href: "/Products#stones-drainage",
      },

    ],
  },
];

const Navbar = () => (
  <CardNav
    logo="/logo.png"
    logoAlt="Company Logo"
    items={items}
    baseColor="#fff"
    menuColor="#000"
    buttonBgColor="#111"
    buttonTextColor="#fff"
    ease="power3.out"
  />
);

export default Navbar;