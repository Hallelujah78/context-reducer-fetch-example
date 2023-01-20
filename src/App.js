import { PictureProvider } from "./PictureContext";

import { SinglePicture } from "./SinglePicture";

function App() {
  return (
    <PictureProvider>
      <SinglePicture />
    </PictureProvider>
  );
}

export default App;
