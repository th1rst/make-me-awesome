import React, { Component } from "react";

const defaultState = {
  showModal: true,
};

class SettingsModal extends Component {
  constructor(props) {
    super(props);
    this.state = { ...defaultState };
  }

  handleShowModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  render() {
    return (
      <>
        {this.state.showModal ? (
          <>
            {this.props.errorMessage === "" ? (
              <div className="absolute right-0 bottom-0 flex flex-col">
                <div className="flex bg-green-200 max-w-sm mb-4">
                  <div className="w-16 bg-green-500">
                    <div
                      className="cursor-pointer p-4"
                      onClick={() => this.handleShowModal()}
                    >
                      <svg
                        className="h-8 w-8 text-white fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path d="M468.907 214.604c-11.423 0-20.682 9.26-20.682 20.682v20.831c-.031 54.338-21.221 105.412-59.666 143.812-38.417 38.372-89.467 59.5-143.761 59.5h-.12C132.506 459.365 41.3 368.056 41.364 255.883c.031-54.337 21.221-105.411 59.667-143.813 38.417-38.372 89.468-59.5 143.761-59.5h.12c28.672.016 56.49 5.942 82.68 17.611 10.436 4.65 22.659-.041 27.309-10.474 4.648-10.433-.04-22.659-10.474-27.309-31.516-14.043-64.989-21.173-99.492-21.192h-.144c-65.329 0-126.767 25.428-172.993 71.6C25.536 129.014.038 190.473 0 255.861c-.037 65.386 25.389 126.874 71.599 173.136 46.21 46.262 107.668 71.76 173.055 71.798h.144c65.329 0 126.767-25.427 172.993-71.6 46.262-46.209 71.76-107.668 71.798-173.066v-20.842c0-11.423-9.259-20.683-20.682-20.683z" />
                        <path d="M505.942 39.803c-8.077-8.076-21.172-8.076-29.249 0L244.794 271.701l-52.609-52.609c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.077-8.077 21.172 0 29.249l67.234 67.234a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058L505.942 69.052c8.077-8.077 8.077-21.172 0-29.249z" />
                      </svg>
                    </div>
                  </div>
                  <div className="w-auto text-grey-darker items-center p-4">
                    <span className="text-lg font-bold pb-4">Success!</span>
                    <p className="leading-tight">{this.props.successMessage}</p>
                  </div>
                  <div
                    className="cursor-pointer mr-4 mt-2"
                    onClick={() => this.handleShowModal()}
                  >
                    CLOSE
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute right-0 bottom-0 flex flex-col">
                <div className="flex bg-red-200 max-w-sm mb-4">
                  <div className="w-16 bg-red-500">
                    <div
                      className="cursor-pointer p-4"
                      onClick={() => this.handleShowModal()}
                    >
                      <svg
                        className="h-8 w-8 text-white fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M437.019 74.981C388.667 26.629 324.38 0 256 0S123.333 26.63 74.981 74.981 0 187.62 0 256s26.629 132.667 74.981 181.019C123.332 485.371 187.62 512 256 512s132.667-26.629 181.019-74.981C485.371 388.667 512 324.38 512 256s-26.629-132.668-74.981-181.019zM256 470.636C137.65 470.636 41.364 374.35 41.364 256S137.65 41.364 256 41.364 470.636 137.65 470.636 256 374.35 470.636 256 470.636z"
                          fill="#FFF"
                        />
                        <path
                          d="M341.22 170.781c-8.077-8.077-21.172-8.077-29.249 0L170.78 311.971c-8.077 8.077-8.077 21.172 0 29.249 4.038 4.039 9.332 6.058 14.625 6.058s10.587-2.019 14.625-6.058l141.19-141.191c8.076-8.076 8.076-21.171 0-29.248z"
                          fill="#FFF"
                        />
                        <path
                          d="M341.22 311.971l-141.191-141.19c-8.076-8.077-21.172-8.077-29.248 0-8.077 8.076-8.077 21.171 0 29.248l141.19 141.191a20.616 20.616 0 0 0 14.625 6.058 20.618 20.618 0 0 0 14.625-6.058c8.075-8.077 8.075-21.172-.001-29.249z"
                          fill="#FFF"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="w-auto text-black opacity-75 items-center p-4">
                    <span className="text-lg font-bold pb-4">Error!</span>
                    <p className="leading-tight">{this.props.errorMessage}</p>
                  </div>
                  <div
                    className="cursor-pointer mr-4 mt-2"
                    onClick={() => this.handleShowModal()}
                  >
                    CLOSE
                  </div>
                </div>
              </div>
            )}
          </>
        ) : null}
      </>
    );
  }
}

export default SettingsModal;
