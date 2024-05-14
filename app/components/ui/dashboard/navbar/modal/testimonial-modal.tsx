//TODO: make this customized
export default function TestimonialModal() {
  return (
    <dialog id="new_awe_modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box w-11/12 max-w-5xl">
        <h3 className="font-bold text-lg">New Testimonial</h3>
        <p className="py-4">Create a new testimonial for your AWE.</p>
        <div className="modal-action justify-start">
          <form method="dialog" className="w-full">
            {/* if there is a button in form, it will close the modal */}
            <div className="flex flex-col gap-2">
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                id="description"
                type="text"
                placeholder="Testimonial"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                type="file"
                className="file-input file-input-bordered w-full max-w-xs"
              />

              <div className="rating">
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
                <input
                  type="radio"
                  name="rating-2"
                  className="mask mask-star-2 bg-orange-400"
                />
              </div>
              <div className="flex gap-2 justify-end mt-4">
                <button className="btn btn-primary max-w-fit">Submit</button>
                <button className="btn btn-secondary max-w-fit">Close</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </dialog>
  );
}
