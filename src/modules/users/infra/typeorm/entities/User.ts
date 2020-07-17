import { uuid } from 'uuidv4';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column('timestamp')
    last_login_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(data?: Omit<User, 'id'>) {
        if(data){
            this.id = uuid();
            this.name = data.name;
            this.email = data.email;
            this.password = data.password;
        }
    }
}

export default User;