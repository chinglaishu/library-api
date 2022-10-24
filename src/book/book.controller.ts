import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ROLE } from 'src/core/constants/constants';
import { Roles } from 'src/core/decorators/role.decorator';
import { ReqUser } from 'src/core/decorators/user.decorator';
import { SocketGateway } from 'src/socket/socket.gateway';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly userService: UserService, 
    private readonly socketGateway: SocketGateway,
  ) {}

  @Roles(ROLE.ADMIN)
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Post(':id/borrow')
  borrowBook(@ReqUser() user: User, @Param('id') id: string) {
    return this.bookService.borrowBook(id, user);
  }

  @Post(':id/return')
  async returnBook(@ReqUser() user: User, @Param('id') id: string) {
    const book = await this.bookService.returnBook(id, user);
    await this.userService.rewardReturnBook(user);
    this.socketGateway.sendMessage('book_available', `${book.title} is available now!`);
    return book;
  }

  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(id);
  }
}
