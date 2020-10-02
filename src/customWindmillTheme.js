export default {
    button: {
        primary: {
            base: 'text-white bg-green-600 border border-transparent',
            active: 'active:bg-green-600 hover:bg-green-700 focus:shadow-outline-purple',
            disabled: 'opacity-50 cursor-not-allowed',
          },
    },
    input: {
      active:
        'focus:border-blue-400 dark:border-gray-600 focus:shadow-outline-blue-600 dark:focus:border-gray-600 dark:focus:shadow-outline-gray dark:bg-gray-700',
    },
    select: {
      active:
        'focus:border-blue-400 dark:border-gray-600 dark:bg-gray-700 focus:shadow-outline-blue-400 dark:focus:shadow-outline-gray dark:focus:border-gray-600',
    },
    badge: {
      base: 'inline-flex px-4 text-xl font-bold font-large leading-10 rounded-full',
      neutral: 'text-gray-600 bg-yellow-200 dark:text-gray-100 dark:bg-yellow-300',
    },
  }