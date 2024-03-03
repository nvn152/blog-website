import { Button } from "flowbite-react";

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-gray-500  justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl ">Want to learn more?</h2>
        <p className="text-gray-500 my-3">Check out my Github</p>
        <Button
          gradientDuoTone="purpleToBlue"
          className="rounded-tl rounded-bl-none"
        >
          <a
            href="https://github.com/nvn152"
            target="_blank"
            rel="noreferrer noopen"
          >
            Learn more
          </a>
        </Button>
      </div>
      <div className="flex-1">
        <img
          src="https://img.freepik.com/free-photo/html-system-website-concept_23-2150376744.jpg"
          className="p-7"
        />
      </div>
    </div>
  );
}
export default CallToAction;
