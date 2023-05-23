export interface Student {
  id: number
  first_name: string
  last_name: string
  email: string
  gender: string
  country: string
  avatar: string
  btc_address: string
}
// Hàm Pick trong đoạn code trên được sử dụng để tạo một kiểu dữ liệu mới từ kiểu Student đã định nghĩa. Kiểu dữ liệu mới này được gọi là Students và chỉ bao gồm một số thuộc tính cụ thể từ kiểu Student.
export type Students = Pick<Student, 'id' | 'email' | 'avatar' | 'last_name'>[]
