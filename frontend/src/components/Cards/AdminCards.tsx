const projects = [
    { name: 'New', initials: 'S', href: '#', members: 16, bgColor: 'bg-green-600' },
    { name: 'In Progress', initials: 'IP', href: '#', members: 12, bgColor: 'bg-purple-600' },
    { name: 'Archieved', initials: 'P', href: '#', members: 16, bgColor: 'bg-yellow-500' },
    { name: 'Closed', initials: 'US', href: '#', members: 8, bgColor: 'bg-rose-700' },
  ];
  
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  
  export default function AdminCards() {
    return (
      <div>
        <h2 className="text-sm font-medium text-gray-500">Elections</h2>
        <ul role="list" className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {projects.map((project) => (
            <li key={project.name} className="col-span-1 flex rounded-md shadow-sm">
              <div
                className={classNames(
                  project.bgColor,
                  'flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white'
                )}
              >
                {project.initials}
              </div>
              <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
                <div className="flex-1 truncate px-4 py-2 text-sm">
                  <a href={project.href} className="font-medium text-gray-900 hover:text-gray-600">
                    {project.name}
                  </a>
                  <p className="text-gray-500">{project.members} Deliveries</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  