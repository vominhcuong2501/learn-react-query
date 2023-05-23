import { getStudents } from 'apis/students.api'
import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useQueryString } from 'utils/utils'
import { useQuery } from 'react-query'
import classNames from 'classnames'

const LIMIT = 10

export default function Students() {
  // const [students, setStudents] = useState<StudentsType>([])
  // const [isLoading, setIsLoading] = useState<boolean>(false)
  // useEffect(() => {
  //   setIsLoading(true)
  //   getStudents(1, 10)
  //     .then((res) => {
  //       setStudents(res.data)
  //     })
  //     .finally(() => {
  //       setIsLoading(false)
  //     })
  // }, [])

  // dùng dể lấy param của url
  const queryString: { page?: string } = useQueryString()
  const page = Number(queryString.page) || 1

  // dùng react query lấy dữ liệu
  const { data, isLoading } = useQuery({
    queryKey: ['students', page],
    queryFn: () => getStudents(page, LIMIT),
    // dùng dể cải thiện UX khi chuyển trang không hiển thị trạng thái loading
    keepPreviousData: true
  })

  // lấy tổng số item từ api trả về
  const totalStudentsCount = Number(data?.headers['x-total-count'] || 0)

  // làm tròn lên có số trang
  const totalPage = Math.ceil(totalStudentsCount / LIMIT)

  return (
    <div>
      <h1 className='text-center text-blue-500' style={{fontSize: "30px", fontWeight: "900"}}>LIST STUDENT</h1>
      <div className='text-right'>
        <Link
          to='/students/add'
          className='mr-2 mb-2 rounded-lg bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gradient-to-br focus:outline-none focus:ring-4 focus:ring-blue-300 '
        >
          + Add Student
        </Link>
      </div>

      {isLoading && (
        <div role='status' className='mt-6 animate-pulse'>
          <div className='mb-4 h-4  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10 rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='mb-2.5 h-10  rounded bg-gray-200' />
          <div className='h-10  rounded bg-gray-200' />
          <span className='sr-only'>Loading...</span>
        </div>
      )}
      {!isLoading && (
        <Fragment>
          <div className='relative mt-6 overflow-x-auto shadow-md sm:rounded-lg'>
            <table className='w-full text-left text-sm text-gray-500'>
              <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
                <tr>
                  <th scope='col' className='py-3 px-6'>
                    #
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Avatar
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Name
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    Email
                  </th>
                  <th scope='col' className='py-3 px-6'>
                    <span className='sr-only'>Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.data.map((student) => (
                  <tr key={student.id} className='border-b bg-white hover:bg-gray-50'>
                    <td className='py-4 px-6'>{student.id}</td>
                    <td className='py-4 px-6'>
                      <img src={student.avatar} alt={student.last_name} className='h-5 w-5' />
                    </td>
                    <th scope='row' className='whitespace-nowrap py-4 px-6 font-medium text-gray-900'>
                      {student.last_name}
                    </th>
                    <td className='py-4 px-6'>{student.email}</td>
                    <td className='py-4 px-6 text-right'>
                      <Link to={`/students/1`} className='mr-5 font-medium text-blue-600 hover:underline'>
                        Edit
                      </Link>
                      <button className='font-medium text-red-600'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className='mt-6 flex justify-center'>
            <nav aria-label='Page navigation example'>
              <ul className='inline-flex -space-x-px'>
                <li>
                  {page === 1 ? (
                    <span className='cursor-not-allowed rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                      Previous
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${page - 1}`}
                      className='rounded-l-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    >
                      Previous
                    </Link>
                  )}
                </li>
                {Array(totalPage)
                  .fill(0)
                  .map((_, index) => {
                    const pageNumber = index + 1
                    const isActive = pageNumber === page
                    return (
                      <li key={pageNumber}>
                        <Link
                          className={classNames(
                            'border border-gray-300 py-2 px-3 leading-tight hover:bg-gray-100 hover:text-gray-700',
                            {
                              'bg-gray-100 text-gray-700': isActive,
                              'bg-white text-gray-500': !isActive
                            }
                          )}
                          to={`/students?page=${pageNumber}`}
                        >
                          {pageNumber}
                        </Link>
                      </li>
                    )
                  })}
                <li>
                  {page === totalPage ? (
                    <span className='cursor-not-allowed rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'>
                      Next
                    </span>
                  ) : (
                    <Link
                      to={`/students?page=${page + 1}`}
                      className='rounded-r-lg border border-gray-300 bg-white py-2 px-3 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                    >
                      Next
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </Fragment>
      )}
    </div>
  )
}
