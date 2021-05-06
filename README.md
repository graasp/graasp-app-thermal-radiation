# The Emission of Radiation by a Solid at Thermal Equilibrium: A Physics Simulation

Every object that has a finite temperature radiates energy. In this simulation, users can change the temperature of a solid to observe how its emitted radiation changes.

The solid is represented at the bottom of the screen as a lattice of positive ions (when in *Microscopic View*), or as a simplified terrain (when in *Macroscopic view*). After toggling the *Radiation* option on and clicking play, users can observe radiation escaping from the solid. Using the thermometer on the left of the screen, users can change the temperature of the solid, and observe the effect of these changes on the emitted radiation. For example, users will note that higher temperature solids emit radiation with a lower (average) wavelength than those at lower temperatures. When in *Microscopic View*, users can also observe the oscillation of the positive ions comprising the lattice, noting that (1) it is this oscillation that generates the observed emission, and (2) at higher temperatures, the ions oscillate more rapidly. By toggling the *Grid* option on, users can measure the wavelength of the emitted radiation. Finally, by toggling the *Wavelength Distribution* option on, users will see a chart showing the *distribution* of wavelengths emitted at a given temperature, noting that, for simplification purposes, the radiation displayed on the screen consists only of the most frequent wavelength in that distribution, whereas in real settings the solid would emit radiation with wavelengths across this distribution.

![thermalRadiation](https://user-images.githubusercontent.com/19311953/117110579-9f041580-ad86-11eb-8361-342ef221869d.gif)
## Try the application!

A live deployment of the application can be accessed [here](https://apps.graasp.eu/5acb589d0d5d9464081c2d46/602bdf211db0d51cb392aeb9/latest/index.html). Please submit any issues you identify to the application's [GitHub repository](https://github.com/graasp/graasp-app-thermal-radiation/issues).

## Run and modify the application locally

- Once you clone the repository, run `yarn` or `npm install` to install its dependencies.
- In the project directory, make sure to create an `.env.local` file and to add `"REACT_APP_BASE="` to the top of this file. You can do this through your shell by running `touch .env.local` and `echo "REACT_APP_BASE=" >> .env.local` in the project root.
- Run `yarn start` (or `npm start`) to start the application. It should automatically open in your browser at `localhost:3000`. You can also access it in development mode on `http://localhost:3000/?appInstanceId=6156e70ab253020033364411&spaceId=5b56e70ab253020033364411&dev=true`
- The simulation's main components are located in `src/components/lab` (canvas components) and `src/components/common` (side menu and controls). It uses [React](https://github.com/facebook/react), [React-Redux](https://github.com/reduxjs/react-redux), and [React-Konva](https://github.com/konvajs/react-konva).
