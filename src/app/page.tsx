"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import { Header } from "../section/header";
import { Hero } from "../section/hero";
import SectionOne from "../section/sectionOne";
import Footer  from "../section/footer";

export default function Home() {
  const router = useRouter();

  const handleSuccessfulAuth = (userData: { firstName: string; lastName: string }) => {
    // You can perform any additional actions here if needed
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  return (
    <>
      <Header />
      <Hero />
      <SectionOne />
      <Footer />
    </>
  )
}