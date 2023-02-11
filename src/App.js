import { PictureProvider } from "./PictureContext";

import { SinglePicture } from "./SinglePicture";
import Pic from "./Pic";

function App() {
  return (
    <PictureProvider>
      <SinglePicture />
      <Pic />
    </PictureProvider>
  );
}

export default App;
