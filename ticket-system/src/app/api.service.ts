import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { from, Observable } from 'rxjs';

import { AppRouter } from './../../../server/router';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private client;
  constructor() {
    this.client = createTRPCProxyClient<AppRouter>({
      links: [
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
        }),
      ],
    });
  }

  createTicket(ticket: {
    title: string;
    description: string;
  }): Observable<any> {
    return from(this.client.ticket.query(ticket));
  }
}
