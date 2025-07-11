import Image from 'next/image';

export default function Page() {
  return (
    <div className="h-full px-6 py-12">
      <div className="max-w-3xl mx-auto text-center">
        <img src="/yummy__logo_250px.svg" alt="Yummy Logo" className="h-60 mx-auto mb-6" />
        <h1 className="text-6xl bagel-fat-one-regular text-secondary mb-4">About Yummy</h1>
        <p className="text-base-content mb-6">
          Yummy is built by three passionate food lovers who believe that good code and good food should be shared. Whether you're looking to organize your recipes or discover new ones, Yummy helps you keep your kitchen and your creativity alive.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
          <div>
            <img src="https://cataas.com/cat/says/GuMo" alt="Team member" className="w-48 h-48 mx-auto rounded-full mb-2" />
            <h2 className="text-xl font-black">Lnus</h2>
            <p className="text-sm text-base-content">Loves spicy curries and climbs on clean code.</p>
          </div>
          <div>
            <img src="https://cataas.com/cat/says/Kannste!" alt="Team member" className="w-48 h-48 mx-auto rounded-full mb-2" />
            <h2 className="text-xl font-black">Kon</h2>
            <p className="text-sm text-base-content">Our dessert master and backend enthusiast.</p>
          </div>
          <div>
            <img src="https://cataas.com/cat/says/Loading..." alt="Team member" className="w-48 h-48 mx-auto rounded-full mb-2" />
            <h2 className="text-xl font-black">Dens</h2>
            <p className="text-sm text-base-content max-w-sm">Grills in the summer, debugs in the winter.</p>
          </div>
        </div>
      </div>

    </div>
  );
}