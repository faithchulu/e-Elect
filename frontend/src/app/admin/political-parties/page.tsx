"use client"
import React from 'react'
import DefaultLayout from '@/components/Layouts/DefaultLayout'
import TableOne from '@/components/Tables/TableOne'
import TableTwo from '@/components/Tables/TableTwo'
import TableThree from '@/components/Tables/TableThree'
import TableFour from '@/components/Tables/TableFour'
import PoliticalPartyTable from '@/components/Tables/PoliticalPartyTable'

const PoliticalParties = () => {
  return (
    <DefaultLayout>
      <div>PoliticalParties</div>
      <PoliticalPartyTable></PoliticalPartyTable>
    </DefaultLayout>
  )
}

export default PoliticalParties