<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;



class UserController extends AbstractController
{   
     /**
     * @Route("/", name="home", defaults={"reactRouting": null})
     */
    public function index()
    {
        return $this->render('user/index.html.twig');
    }

    /**
     * @Route("/user", methods={"GET","HEAD"})
     */
    public function getUsers():Response
    {
        $repository = $this->getDoctrine()->getRepository(User::class);
        $users = $repository->findAll();

        return $this->json(
            ['users'=> $users]
        );
    }

    /**
     * @Route("/user" ,  methods={"POST"})
     */
    public function addUser(Request $request): Response
    {   
        $serializer = $this->get('serializer');
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        
        // you can fetch the EntityManager via $this->getDoctrine()
        // or you can add an argument to the action: createProduct(EntityManagerInterface $entityManager)
        $entityManager = $this->getDoctrine()->getManager();
        // tell Doctrine you want to (eventually) save the Product (no queries yet)
        if (!$entityManager) {
            return $this->json("user already exists" , 404);
        }
        $entityManager->persist($user);

        // actually executes the queries (i.e. the INSERT query)
        $entityManager->flush();

        return $this->json($user, 201);
    }

    /**
     * @Route("/user/{id}", methods={"GET","HEAD"})
     */
    public function getUserWithId(Request $request):Response
    {   
        $id = $request->get('id');
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);

        if (!$user) {
            throw $this->createNotFoundException(
                'No user found with email '.$id
            );
        }

        return $this->json($user , 201);
    }


    /**
     * @Route("/user/{id}", methods ={"PUT"})
     */
    public function updateUser(Request $request)
    {   
        //serialize request 
        $serializer = $this->get('serializer');
        $newDetails = $serializer->deserialize($request->getContent(), User::class, 'json');

        //get the user to be updated 
        $id = $request->get('id');
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);

        if (!$user) {
            return $this->json("user does not exist" , 404);
        }

        $email = $newDetails-> getEmail();
        $firstName = $newDetails-> getFirstName();
        $lastName = $newDetails-> getLastName();
        $phoneNumber = $newDetails-> getPhoneNumber();
        $age = $newDetails-> getAge();
        $address = $newDetails->getAddress();

        
        if($email){
            $user->setEmail($email);
        }

        if($firstName){
            $user->setFirstName($firstName);
        }

        if($lastName){
            $user->setLastName($lastName);
        }

        if($phoneNumber){
            $user->setPhoneNumber($phoneNumber);
        }

        if($age){
            $user->setAge($age);
        }

        if($address){
            $user->setAddress($address);
        }
        
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();

        return $this->json($user , 200);
    }

    
     /**
     * @Route("/user/{id}" , methods={"DELETE"})
     */
    public function deleteUser(Request $request):Response
    {   
        //get the user to be deleted 
        $id = $request->get('id');
        $repository = $this->getDoctrine()->getRepository(User::class);
        $user = $repository->findOneBy(['id' => $id]);

        //check
        if (!$user) {
            return $this->json("user does not exist" , 404);
        }

        //use entity manager to delete user 
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($user);
        $entityManager->flush();

        return $this->json($user, 204);
    }

}
