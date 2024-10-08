const parties = [
    {
      id: 1,
      name: 'Party A',
      slogan: 'slogan a',
      candidate: 'candidate a',
      
    },
    {
      id: 2,
      name: 'Party B',
      slogan: 'slogan b',
      candidate: 'candidate b',
      storage: '256 GB SSD disk',
      price: '$80',
    },
    // More plans...
  ]
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  export default function PoliticalPartyTable  () {
    return (
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Plans</h1>
            <p className="mt-2 text-sm text-gray-700">
              Your team is on the <strong className="font-semibold text-gray-900">Startup</strong> plan. The next payment
              of $80 will be due on August 4, 2022.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update political party
            </button>
          </div>
        </div>
        <div className="-mx-4 mt-10 ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  Party
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Slogan
                </th>
                <th
                  scope="col"
                  className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell"
                >
                  Candidate
                </th>
                
                
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {parties.map((plan, planIdx) => (
                <tr key={plan.id}>
                  <td
                    className={classNames( 'border-t',
                      'relative py-4 pl-4 pr-3 text-sm sm:pl-6',
                    )}
                  >
                    <div className="font-medium text-gray-900">
                      {plan.name}
                    </div>
                    <div className="mt-1 flex flex-col text-gray-500 sm:block lg:hidden">
                      <span>
                        {plan.slogan} / {plan.slogan}
                      </span>
                      <span className="hidden sm:inline">·</span>
                      
                    </div>
                    {planIdx !== 0 ? <div className="absolute -top-px left-6 right-0 h-px bg-gray-200" /> : null}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                    )}
                  >
                    {plan.slogan}
                  </td>
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-gray-200',
                      'hidden px-3 py-3.5 text-sm text-gray-500 lg:table-cell',
                    )}
                  >
                    {plan.candidate}
                  </td>
                  
                  <td
                    className={classNames(
                      planIdx === 0 ? '' : 'border-t border-',
                      'relative py-3.5  text-right text-sm font-medium sm:pr-6',
                    )}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white"
                    >
                      Edit/Delete <span className="sr-only">, {plan.name}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  