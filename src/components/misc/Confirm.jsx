export const ConfirmCont = (props) => {
  const { cancelFunc, confirmFunc } = props;

  return (
    <>
      <p class="mb-4 text-gray-500 dark:text-gray-300">
        Are you sure you want to restart?
      </p>
      <div class="flex justify-center items-center space-x-4">
        <button
          type="button"
          class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          onClick={() => {
            cancelFunc();
          }}
        >
          No, cancel
        </button>
        <button
          type="submit"
          class="py-2 px-3 text-sm font-medium text-center text-white bg-red-400 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
          onClick={() => {
            confirmFunc();
          }}
        >
          Yes, I'm sure
        </button>
      </div>
    </>
  );
};
