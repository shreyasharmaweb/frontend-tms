import AddOrganisation from '../../organisms/AddOrganisationOrganism/AddOrganisationOrganism'

export default function addOrgPage() {
  return (
    <div>
          <AddOrganisation tog={function (): void {
        throw new Error('Function not implemented.')
      } } />
    </div>
  )
}
