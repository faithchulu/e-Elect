"use client"
import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import PartyTable from '@/components/Tables/PartyTable'

const PoliticalParties = () => {
  return (
    <DefaultLayout>
      <PartyTable/>
    </DefaultLayout>
  )
}

export default PoliticalParties