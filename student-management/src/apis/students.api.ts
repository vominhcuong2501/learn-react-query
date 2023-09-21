import { Students, Student } from 'types/students.type'
import http from 'utils/http'

// lấy danh sách học sinh
export const getStudents = (page: number | string, limit: number | string, signal?: AbortSignal) =>
  http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    },
    signal
  })

// lấy thông tin học sinh
export const getStudent = (id: number | string) => http.get<Student>(`students/${id}`)

// thêm học sinh
export const addStudent = (student: Omit<Student, 'id'>) => http.post<Student>('/students', student)

// cập nhật thông tin học sinh
export const updateStudent = (id: number | string, student: Student) => http.put<Student>(`students/${id}`, student)

// xóa học sinh
export const deleteStudent = (id: number | string) => http.delete<{}>(`students/${id}`)
