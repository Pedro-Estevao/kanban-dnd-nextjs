'use client';

import React from "react";
import {
    Navbar as NextUINavbar,
    NavbarContent,
    NavbarMenu,
    NavbarMenuToggle,
    NavbarBrand,
    NavbarItem,
    Button,
    Link,
    Dropdown,
    DropdownTrigger,
    Avatar,
    DropdownMenu,
    DropdownItem,
    User,
} from "@nextui-org/react";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import ThemeSwitch from "@/components/ThemeSwitch";
import {
    CoffeeIcon,
    GithubIcon,
    HeartFilledIcon,
    LinkedInIcon,
} from "@/components/Icons";
import Image from "next/image";

export const Navbar = () => {
    // const searchInput = (
    //     <Input
    //         aria-label="Search"
    //         classNames={{
    //             inputWrapper: "bg-default-100",
    //             input: "text-sm",
    //         }}
    //         endContent={
    //             <Kbd className="hidden lg:inline-block" keys={["command"]}>
    //                 K
    //             </Kbd>
    //         }
    //         labelPlacement="outside"
    //         placeholder="Search..."
    //         startContent={
    //             <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
    //         }
    //         type="search"
    //     />
    // );

    return (
        <NextUINavbar maxWidth="xl" position="sticky">
            <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
                <NavbarBrand as="li" className="gap-3 max-w-fit">
                    <NextLink className="flex justify-start items-center gap-1" href="/">
                        <p className="font-bold text-inherit">PEDRO ESTEVÃO</p>
                    </NextLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent
                className="hidden sm:flex basis-1/5 sm:basis-full"
                justify="end"
            >
                <NavbarItem className="hidden sm:flex gap-2">
                    <Link isExternal href={siteConfig.links.linkedin} aria-label="LinkedIn">
                        <LinkedInIcon className="text-default-500" />
                    </Link>
                    <Link isExternal href={siteConfig.links.github} aria-label="Github">
                        <GithubIcon className="text-default-500" />
                    </Link>
                    <ThemeSwitch />
                </NavbarItem>
                <NavbarItem className="hidden md:flex">
                    <Button
                        isExternal
                        as={Link}
                        className="text-sm font-normal text-default-600 bg-default-100"
                        href={siteConfig.links.sponsor}
                        target="_blank"
                        startContent={<HeartFilledIcon className="text-danger" />}
                        variant="flat"
                    >
                        Sponsor
                    </Button>
                </NavbarItem>
                <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                        <Avatar
                            isBordered
                            color="primary"
                            as="button"
                            className="transition-transform transform hover:scale-105"
                            src="/imgs/avatars/pedro-estevao-avatar.png"
                        />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                        <DropdownItem key="profile" className="h-14 gap-2" href="mailto:contato@pedroestevao.com">
                            <p className="font-semibold">Pedro Estevão</p>
                            <p className="font-semibold">contato@pedroestevao.com</p>
                        </DropdownItem>
                        <DropdownItem key="settings" href={siteConfig.links.sponsor} target="_blank">
                            <div className="flex gap-2 items-center">
                                <CoffeeIcon width={40} height={20} />
                                Buy me a coffee
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>

            <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
                <Link isExternal href={siteConfig.links.github} aria-label="Github">
                    <GithubIcon className="text-default-500" />
                </Link>
                <ThemeSwitch />
                <NavbarMenuToggle />
            </NavbarContent>

            <NavbarMenu className="gap-[12px]">
                <div className="mx-4 mt-2 flex flex-col gap-10">
                    <User
                        as="button"
                        avatarProps={{
                            isBordered: true,
                            color: "primary",
                            size: "lg",
                            src: "/imgs/avatars/pedro-estevao-avatar.png",
                        }}
                        className="transition-transform"
                        description="@pedro-estevao"
                        name="Pedro Estevão"
                    />
                    <NavbarItem className="hidden max-sm:flex">
                        <Button
                            isExternal
                            as={Link}
                            className="text-sm font-normal text-default-600 bg-default-100 w-full"
                            href={siteConfig.links.sponsor}
                            target="_blank"
                            startContent={<CoffeeIcon width={40} height={20} />}
                            variant="flat"
                        >
                            Buy me a coffee
                        </Button>
                    </NavbarItem>
                </div>
            </NavbarMenu>
        </NextUINavbar>
    );
};
