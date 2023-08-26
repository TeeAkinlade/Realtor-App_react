import spinner from '../images/svg/spinner.svg'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center bg-black bg-opacity-50 fixed left-0 right-0 bottom-0 top-0 z-index-50">
        <div>
            <img src={spinner} alt="loading..." />
        </div>
    </div>
  )
}

export default Spinner