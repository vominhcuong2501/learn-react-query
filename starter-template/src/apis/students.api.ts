import { Student, Students } from 'types/students.type'
import http from 'utils/http'
// lấy danh sách students
export const getStudents = (page: number | string, limit: number | string) => {
  return http.get<Students>('students', {
    params: {
      _page: page,
      _limit: limit
    }
  })
}

// tạo thêm student vào danh sách
// OHàm Omit là một phương thức trong TypeScript được sử dụng để tạo một kiểu mới bằng cách loại bỏ một số thuộc tính cụ thể từ kiểu dữ liệu gốc.
export const addStudent = (student: Omit<Student, 'id'>) => {
  return http.post<Student>('/students', student)
}

// lấy thông tin student theo id
export const getStudent = (id: number | string) => {
  return http.get<Student>(`students/${id}`)
}

// cập nhật lại thông tin
export const updateStudent = (id: number | string, student: Student) => http.put<Student>(`students/${id}`, student)

// xóa student
export const deleteStudent = (id: number | string) => http.delete<{}>(`students/${id}`)
