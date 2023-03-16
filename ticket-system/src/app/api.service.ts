import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client';
import { from, Observable } from 'rxjs';

import { AppRouter } from './../../../server/routes';

export interface ITicket {
  title: string;
  id: string;
  created: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private client;
  constructor() {
    /**
     * Provide the AppRouter as generic type to the createTRPCProxyClient function
     */
    this.client = createTRPCProxyClient<AppRouter>({
      /**
       * Ways to call the server methods from client using links.
       * The link functions are invoked in sequence (one after other).
       * The link functions order is important as few link functions are ending links which do not allow the following links to execute. Like httpBatchLink below.
       *
       * httpBatchLink allows to batch the multiple server functions call within a single API network request
       */
      links: [
        // loggerLink(),
        // wsLink(),
        // httpLink(),
        httpBatchLink({
          url: 'http://localhost:3000/trpc',
          headers: { Authorization: 'TOKEN' },
        }),
      ],
    });

    this.client.greetings.greet.query('John').then((res) => console.log(res));

    /**
     * TRPC context usage
     */
    // this.client.admin.getUsers
    //   .query({ adminId: '' })
    //   .then((res) => console.log(res));
  }

  createTicket(ticket: {
    title: string;
    description: string;
  }): Observable<ITicket> {
    /**
     * Multiple requests made over single API network request
     */

    // this.client.greetings.greet.query('John').then((res) => console.log(res));

    /**
     * Typesafe operation when calling the server function, the changes can be caught at run time.
     */
    return from(this.client.ticket.mutate(ticket));
  }
}
